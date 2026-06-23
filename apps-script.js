// ─────────────────────────────────────────────────────────────────────────────
// Add People Employee Engagement Survey — Apps Script
//
// SETUP INSTRUCTIONS:
// 1. Open Google Apps Script: script.google.com
// 2. Create a new project (or open an existing one)
// 3. Paste this entire file into the editor
// 4. Click Save (Ctrl/Cmd + S)
// 5. Click Deploy → New deployment
// 6. Type: Web app
// 7. Execute as: Me (your Google account)
// 8. Who has access: Anyone
// 9. Click Deploy and copy the Web app URL
// 10. Paste that URL into your .env.local as NEXT_PUBLIC_FORM_ENDPOINT
// ─────────────────────────────────────────────────────────────────────────────

var SHEET_ID = '1-0gYSDljette59hXF0YTql0cf06CfMxI34eZh7TDkh4';

var HEADERS = [
  'Timestamp',
  'Team',
  'Leadership',
  'Values',
  'Empowerment',
  'Performance',
  'Recognition',
  'Role Design',
  'Growth',
  'Continuous Improvement',
  'Future Confidence',
  'Belonging',
  'eNPS Score',
  'Improvement Suggestion',
  'Response ID',
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];

    // Add headers on first data row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      // Freeze header row and bold it
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    var row = [
      data.timestamp             || new Date().toISOString(),
      data.team                  || '',
      data.leadership            || '',
      data.values                || '',
      data.empowerment           || '',
      data.performance           || '',
      data.recognition           || '',
      data.roleDesign            || '',
      data.growth                || '',
      data.continuousImprovement || '',
      data.futureConfidence      || '',
      data.belonging             || '',
      data.enpsScore             !== undefined ? data.enpsScore : '',
      data.improvementSuggestion || '',
      data.responseId            || '',
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (used for CORS preflight and health checks)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Add People Engagement Survey endpoint' }))
    .setMimeType(ContentService.MimeType.JSON);
}
