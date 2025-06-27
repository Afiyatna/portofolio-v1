// Google Apps Script API untuk Portfolio
// Deploy sebagai Web App dengan akses "Anyone"

// Konfigurasi Spreadsheet ID - Ganti dengan ID spreadsheet Anda
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Fungsi utama untuk menangani request
function doGet(e) {
  const path = e.parameter.path || 'projects';
  
  try {
    switch(path) {
      case 'projects':
        return getProjects();
      case 'articles':
        return getArticles();
      case 'skills':
        return getSkills();
      case 'about':
        return getAbout();
      default:
        return createResponse({ error: 'Endpoint tidak ditemukan' }, 404);
    }
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

// Fungsi untuk menangani POST request (Contact Form)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    return saveContact(data);
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

// Fungsi untuk mengambil data Projects
function getProjects() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Projects');
  if (!sheet) {
    return createResponse({ error: 'Sheet Projects tidak ditemukan' }, 404);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const projects = rows.map(row => {
    const project = {};
    headers.forEach((header, index) => {
      project[header] = row[index] || '';
    });
    return project;
  });
  
  return createResponse(projects);
}

// Fungsi untuk mengambil data Articles
function getArticles() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Articles');
  if (!sheet) {
    return createResponse({ error: 'Sheet Articles tidak ditemukan' }, 404);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const articles = rows.map(row => {
    const article = {};
    headers.forEach((header, index) => {
      article[header] = row[index] || '';
    });
    return article;
  });
  
  return createResponse(articles);
}

// Fungsi untuk mengambil data Skills
function getSkills() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Skills');
  if (!sheet) {
    return createResponse({ error: 'Sheet Skills tidak ditemukan' }, 404);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const skills = rows.map(row => {
    const skill = {};
    headers.forEach((header, index) => {
      skill[header] = row[index] || '';
    });
    return skill;
  });
  
  return createResponse(skills);
}

// Fungsi untuk mengambil data About
function getAbout() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('About');
  if (!sheet) {
    return createResponse({ error: 'Sheet About tidak ditemukan' }, 404);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const about = rows.map(row => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row[index] || '';
    });
    return item;
  });
  
  return createResponse(about);
}

// Fungsi untuk menyimpan data Contact
function saveContact(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Contacts');
  if (!sheet) {
    return createResponse({ error: 'Sheet Contacts tidak ditemukan' }, 404);
  }
  
  // Validasi data
  if (!data.nama || !data.email || !data.pesan) {
    return createResponse({ error: 'Data tidak lengkap' }, 400);
  }
  
  // Tambahkan timestamp
  const timestamp = new Date().toISOString();
  
  // Simpan ke spreadsheet
  sheet.appendRow([
    timestamp,
    data.nama,
    data.email,
    data.pesan
  ]);
  
  return createResponse({ message: 'Pesan berhasil disimpan' });
}

// Fungsi helper untuk membuat response
function createResponse(data, statusCode = 200) {
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(JSON.stringify(data));
  
  // Set CORS headers
  response.addHeader('Access-Control-Allow-Origin', '*');
  response.addHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}

// Fungsi untuk menangani OPTIONS request (CORS preflight)
function doOptions(e) {
  const response = ContentService.createTextOutput();
  response.addHeader('Access-Control-Allow-Origin', '*');
  response.addHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
  return response;
} 