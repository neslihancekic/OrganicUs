const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailToProducer(producerEmail, orderData) {
    const emailData = {
        to: producerEmail,
        from: 'organicus.team@gmail.com',
        subject: `A new order is received`,
        html: `
        <h1>A new customer has bought your product 🚀!</h1>
        <h2>Customer name: ${orderData.user.name}</h2>
        <h2>Customer address: ${orderData.user.address}</h2>
        <h2>User's email: ${orderData.user.email}</h2>
        <h2>Total products: ${orderData.products.length}</h2>
        <h2>Product details:</h2>
        <hr />
        ${orderData.products
                .map(p => {
                    return `<div>
                    <h3>Product Name: ${p.name}</h3>
                    <h3>Product Price: ${p.price}</h3>
                    <h3>Product Quantity: ${p.count}</h3>
                    </div>`;
                })
                .join('--------------------')}
    `
    };

    sgMail.send(emailData)
}

function sendEmailToCustomer(customerEmail, orderData) {
    const emailData = {
        to: customerEmail,
        from: 'organicus.team@gmail.com',
        subject: `Congratulations!`,
        html: `
        <h1>Your basket has confirmed 🚀!</h1>
        <h2>Total products: ${orderData.products.length}</h2>
        <h2>Address: ${orderData.address}</h2>
        <h2>Product details:</h2>
        <hr />
        ${orderData.products
                .map(p => {
                    return `<div>
                    <h3>Product Name: ${p.name}</h3>
                    <h3>Product Price: ${p.price}</h3>
                    <h3>Product Quantity: ${p.count}</h3>
                    </div>`;
                })
                .join('--------------------')}
        <h2>Total order cost: ${orderData.amount}<h2>
    `
    };

    sgMail.send(emailData)
}

exports.sendEmailToProducer = sendEmailToProducer;
exports.sendEmailToCustomer = sendEmailToCustomer;