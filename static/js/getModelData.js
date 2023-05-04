const salesData = {
    country: [],
    countrySales: [],
    month: [],
    monthlySales: [],
};

async function getData() {
    const [product, price, month, country] = [[], [], [], []];

    await fetch('/api/sales')
    .then((response) => response.json())
    .then((data) => {
        // const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]
        data.data.map((sale) => {
            product.push(sale.product);
            price.push(sale.price);
            month.push(monthNames[new Date(sale.purchase_date).getMonth()]);
            country.push(sale.country);
        })
    })
    .catch((err) => {
        console.log(err);
    })
    return [product, price, month, country];
}   

const data = getData();
data.then(data => {
    [product, price, months, countries] = data;

    countries.forEach((country, index) => {
        countryIndex = salesData.country.indexOf(country);
        if (countryIndex > -1) {
            salesData.countrySales[countryIndex] = salesData.countrySales[countryIndex] + price[index];
        } else {
            salesData.country.push(country);
            salesData.countrySales.push(price[index]);
        }
    })

    months.forEach((month, index) => {
        monthIndex = salesData.month.indexOf(month);
        if (monthIndex > -1) {
            salesData.monthlySales[monthIndex] = salesData.monthlySales[monthIndex] + price[index];
        } else {
            salesData.month.push(month);
            salesData.monthlySales.push(price[index]);
        }
    })
});
