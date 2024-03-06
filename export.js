const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const fs = require('fs');

const OUTPUT = './Bodea Brochure.docx';

// If our output already exists, remove it so we can run the application again.
if(fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

const INPUT = './Bodea Brochure.pdf';


console.log(`About to export ${INPUT} to ${OUTPUT}.`);

// Set up our credentials object.
const credentials =  PDFServicesSdk.Credentials
        .servicePrincipalCredentialsBuilder()
        .withClientId(process.env.PDF_SERVICES_CLIENT_ID)
        .withClientSecret(process.env.PDF_SERVICES_CLIENT_SECRET)
        .build();

// An exectuionContext object wraps our credentials
const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

// This creates an instance of the Export operation we're using, as well as specifying output type (DOCX)
const exportPdfOperation = PDFServicesSdk.ExportPDF.Operation.createNew(PDFServicesSdk.ExportPDF.SupportedTargetFormats.DOCX);

// Set operation input from a source file
const inputPDF = PDFServicesSdk.FileRef.createFromLocalFile(INPUT);
exportPdfOperation.setInput(inputPDF);

try {

    exportPdfOperation.execute(executionContext)
    .then(result => result.saveAsFile(OUTPUT))
    .then(() => {
        console.log('Export Done')
    })
    .catch(err => {
        console.log('Exception encountered while executing operation', err);
    });

} catch(err) {
    console.error('Error:', err);
}



