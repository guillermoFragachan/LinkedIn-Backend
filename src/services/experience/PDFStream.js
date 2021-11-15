import PdfPrinter from 'pdfmake';

export const pdfStream = () => {
	const fonts = {
		Helvetica: {
			normal: 'Helvetica',
			bold: 'Helvetica-Bold',
		},
	};

	const printer = new PdfPrinter(fonts);

	const doc = {
		content: [
			'Title ipsum    dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
		],
		defaultStyle: {
			font: 'Helvetica',
		},
	};
	const options = {
		// ...
	};
	const pdfReadableStream = printer.createPdfKitDocument(doc, options);
	pdfReadableStream.end();
	return pdfReadableStream;
	console.log(1245);
};
