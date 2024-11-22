const admin = require('firebase-admin');
const xlsx = require('xlsx');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true }); // Enable ignoreUndefinedProperties

async function uploadData() {
  try {
    // Load the Excel file and specify the 'Items' sheet
    const workbook = xlsx.readFile(path.join(__dirname, 'Baseline Data 2022.xlsx'));
    const sheet = workbook.Sheets['Items'];

    // Convert the 'Items' sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    // Map the __EMPTY fields to meaningful names
    const formattedData = data.map(item => ({
      name: item.__EMPTY || 'Unknown Name',
      street: item.__EMPTY_1 || 'Unknown Street',
      city: item.__EMPTY_2 || 'Unknown City',
      state: item.__EMPTY_3 || 'Unknown State',
      zip: item.__EMPTY_4 || '00000',
      latitude: item.__EMPTY_5 || 0,
      longitude: item.__EMPTY_6 || 0,
      item: item.__EMPTY_7 || 'Unknown Item',
      category: item.__EMPTY_8 || 'Unknown Category',
    }));

    // Use batch to optimize uploads
    const batch = db.batch();
    formattedData.forEach((item) => {
      const docRef = db.collection('recycle_locations').doc();
      batch.set(docRef, item);
    });

    // Commit the batch to Firestore
    await batch.commit();
    console.log('Data uploaded successfully from the Items sheet to Firestore!');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

uploadData();
