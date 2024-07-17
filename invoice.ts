//Invoice Issuing
//invoiceId:number => default now
//date:date => format the date
//price:number => price/100 for cents
//item:number
//amount:number => maybe multiple by item amount and calculate total
//tax:number => amount multipe by (100-tax percentage)
//currency: string =>


interface InvoiceItem {
	description: string;
	quantity: number;
	unitPrice: number;
}

interface Invoice {
	invoiceNumber: string;
	issueDate: Date;
	dueDate: Date;
	items: InvoiceItem[];
	discountRate?: number; // Optional discount rate in percentage
	taxRate: number; // Tax rate in percentage
}

function calculateInvoice(invoice: Invoice): { subTotal: number, discount: number, tax: number, total: number } {
	// Calculate the subtotal
	const subTotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

	// Calculate discount
	const discount = invoice.discountRate ? (subTotal * (invoice.discountRate / 100)) : 0;

	// Calculate tax
	const taxableAmount = subTotal - discount;
	const tax = taxableAmount * (invoice.taxRate / 100);

	// Calculate total
	const total = taxableAmount + tax;

	return { subTotal, discount, tax, total };
}

function generateInvoice(): void {
	const invoice: Invoice = {
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

	const { subTotal, discount, tax, total } = calculateInvoice(invoice);

	console.log(`Invoice Number: ${invoice.invoiceNumber}`);
	console.log(`Issue Date: ${invoice.issueDate.toDateString()}`);
	console.log(`Due Date: ${invoice.dueDate.toDateString()}`);
	console.log('Items:');
	invoice.items.forEach(item => {
		console.log(`  - ${item.description}: ${item.quantity} x $${item.unitPrice.toFixed(2)}`);
	});
	console.log(`Subtotal: $${subTotal.toFixed(2)}`);
	console.log(`Discount: $${discount.toFixed(2)}`);
	console.log(`Tax: $${tax.toFixed(2)}`);
	console.log(`Total: $${total.toFixed(2)}`);
}

generateInvoice();

