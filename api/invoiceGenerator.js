const PDFGenerator = require('pdfkit')
const fs = require('fs')

class InvoiceGenerator {
    constructor(invoice,invoiceNumber) {
        this.invoice = invoice;
        this.invoiceNumber = invoiceNumber;
    }

    generateHeaders(doc) {
        const billingAddress = this.invoice.billingAddress
        const beginningOfPage = 50
        const endOfPage = 550
        doc
            .image('images/logo.png',260,0, { width: 80})
            .fillColor('#000')
            .text('MAKE UP TIME',260,75,{bold: true})

        doc.moveTo(beginningOfPage,100)
            .lineTo(endOfPage,100)
            .stroke()
        doc
            .fontSize(15)
            .text('~INVOICING~', 50, 150, {align: 'left'})
            .fontSize(10)
            .text(`Invoice Number: ${this.invoiceNumber}`, {align: 'left'})
            .text(`Due: ${this.invoice.date}`, {align: 'left'})
            .text(`Duty free: $${this.invoice.total}`, {align: 'left'})
            .text(`Tax: $${this.invoice.tax}`, {align: 'left'})
            .text(`Total: $${this.invoice.total + this.invoice.tax}`, {align: 'left'})
            .moveDown()
            .text(`Billing Address:\n ${billingAddress.name}\n${billingAddress.address}\n${billingAddress.city}`, {align: 'left'})
    
        doc.moveTo(beginningOfPage,290)
            .lineTo(endOfPage,290)
            .stroke()

    }

    generateTable(doc) {
        const beginningOfPage = 50
        const endOfPage = 550
        const tableTop = 300
        const itemCodeX = 50
        const descriptionX = 120
        const quantityX = 240
        const priceX = 300
        const amountX = 350

        doc
            .fontSize(10)
            .text('Item Code', itemCodeX, tableTop, {bold: true})
            .text('Description', descriptionX, tableTop)
            .text('Quantity', quantityX, tableTop)
            .text('Price', priceX, tableTop)
            .text('Amount', amountX, tableTop)


        doc.moveTo(beginningOfPage,315)
            .lineTo(endOfPage,315)
            .stroke()

        const items = this.invoice.items
        let i = 0


        for (i = 0; i < items.length; i++) {
            const item = items[i]
            const y = tableTop + 25 + (i * 25)

            doc
                .fontSize(10)
                .text(item.id, itemCodeX, y)
                .text(item.productName, descriptionX, y)
                .text(item.amount, quantityX, y)
                .text(`$ ${item.price}`, priceX, y)
                .text(`$ ${item.price * item.amount}`, amountX, y)
        }
    }

    generateFooter(doc) {
        doc
            .fontSize(10)
            .text(`Payment due upon receipt. `, 50, 700, {
                align: 'center'
            })
    }

    generate() {
        let theOutput = new PDFGenerator 

        const fileName = `pdf/Invoice_${this.invoiceNumber}.pdf`

        // pipe to a writable stream which would save the result into the same directory
        theOutput.pipe(fs.createWriteStream(fileName))

        this.generateHeaders(theOutput)

        theOutput.moveDown()

        this.generateTable(theOutput)

        this.generateFooter(theOutput)
        

        // write out file
        theOutput.end()

    }
}

module.exports = InvoiceGenerator