//Invoice Issuing
//invoiceId:number => default now
//date:date => format the date
//price:number => price/100 for cents
//item:number
//amount:number => maybe multiple by item amount and calculate total
//tax:number => amount multipe by (100-tax percentage)
//currency: string =>
function calculateInvoice(invoice) {
    // Calculate the subtotal
    var subTotal = invoice.items.reduce(function (sum, item) { return sum + (item.quantity * item.unitPrice); }, 0);
    // Calculate discount
    var discount = invoice.discountRate ? (subTotal * (invoice.discountRate / 100)) : 0;
    // Calculate tax
    var taxableAmount = subTotal - discount;
    var tax = taxableAmount * (invoice.taxRate / 100);
    // Calculate total
    var total = taxableAmount + tax;
    return { subTotal: subTotal, discount: discount, tax: tax, total: total };
}
function generateInvoice() {
    var invoice = {
        invoiceNumber: 'INV-1001',
        issueDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Due date 30 days from today
        items: [
            { description: 'Item 1', quantity: 2, unitPrice: 50 },
            { description: 'Item 2', quantity: 1, unitPrice: 150 },
            { description: 'Item 3', quantity: 5, unitPrice: 20 }
        ],
        discountRate: 10, // 10% discount
        taxRate: 7.5 // 7.5% tax
    };
    var _a = calculateInvoice(invoice), subTotal = _a.subTotal, discount = _a.discount, tax = _a.tax, total = _a.total;
    console.log("Invoice Number: ".concat(invoice.invoiceNumber));
    console.log("Issue Date: ".concat(invoice.issueDate.toDateString()));
    console.log("Due Date: ".concat(invoice.dueDate.toDateString()));
    console.log('Items:');
    invoice.items.forEach(function (item) {
        console.log("  - ".concat(item.description, ": ").concat(item.quantity, " x $").concat(item.unitPrice.toFixed(2)));
    });
    console.log("Subtotal: $".concat(subTotal.toFixed(2)));
    console.log("Discount: $".concat(discount.toFixed(2)));
    console.log("Tax: $".concat(tax.toFixed(2)));
    console.log("Total: $".concat(total.toFixed(2)));
}
generateInvoice();
