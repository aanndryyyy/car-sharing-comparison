# Car Sharing Comparison
Effotlessly compare main car-sharing rent providers prices, dynamically.

## Data Scraping
Data is colelcted manually. None of the providers have an "API".

### Bolt
Currently only way is to manually update from the Bolt app. Conributions welcome.

### CityBee
Run this script in the browser console (Firefox): https://citybee.ee/ee/hinnad/

```js
var select = document.querySelector('[name="cars"]');
var option = select.firstChild;
var output = [];

while ( option ) {

  if ( option.nodeType !== 1 || option === select ) {
    option = option.nextSibling;
    continue;
  }
  
  output.push({
    name: option.label,
    type: option.dataset.category,
    price: {
      km: parseFloat( option.dataset.km ),
      minute: parseFloat( option.dataset.min ),
      hour: parseFloat( option.dataset.hour ),
      day: parseFloat( option.dataset.day ),
      minimum: 1.89,
      start: 0.50,
    }
  });
        
  option = option.nextSibling;
}

copy( JSON.stringify( output ) );
```

### ELMO
Run this script in the browser console (Firefox): https://elmorent.ee/uus-hinnakiri/

```js
var pricingTable = document.querySelector('#tablepress-12>tbody');
var tableRow     = pricingTable.firstChild;
var output       = [];
var type         = '';

while ( tableRow ) {

  if ( tableRow.nodeType !== 1 || tableRow === pricingTable ) {
    tableRow = tableRow.nextElementSibling;
    continue;
  }

  var name = tableRow.querySelector( '.column-1' ).innerText;

  if ( [ 'eco', 'comfy', 'classy' ].includes( name.toLowerCase() ) ) {
    type = name.toLowerCase();
    tableRow = tableRow.nextElementSibling;
    continue;
  }
  
  output.push({
    name,
    type,
    price: {
      km: {
        base:     parseFloat( tableRow.querySelector( '.column-5' ).innerText ),
        after100: parseFloat( tableRow.querySelector( '.column-6' ).innerText ),
      },
      minute:  parseFloat( tableRow.querySelector( '.column-2' ).innerText ),
      hour:    parseFloat( tableRow.querySelector( '.column-3' ).innerText ),
      day:     parseFloat( tableRow.querySelector( '.column-4' ).innerText ),
      week: {
        price: parseFloat( tableRow.querySelector( '.column-7' ).innerText ),
        km: {
          included: 700.00,
          priceAfter: 0.10
        }
      },
      month: {
        price: parseFloat( tableRow.querySelector( '.column-8' ).innerText ),
        km: {
          included: 3000.00,
          priceAfter: 0.10
        }
      },
      minimum: type === 'classy' ? 30.00 : 0.00,
      start:   0.00,
    },
    priceWithCustomerCard: {
      km:      type === 'classy' ? 0.16 : 0.10,
      hour:    type === 'classy' ? 2.50 : 1.00,
      minimum: type === 'classy' ? 25.00 : 0.00,
    }
  });
        
  tableRow = tableRow.nextElementSibling;
}

copy( JSON.stringify( output ) );
```

### Beast
Run this script in the browser console (Firefox): https://beast.rent/et/hinnad/

```js
var pricingTable = document.querySelector('.eapps-pricing-table-columns-container');
var pricingTableColumns = pricingTable.querySelectorAll('.eapps-pricing-table-column');
var output = [];

pricingTableColumns.forEach( (column) => {
  column = column.querySelector('.eapps-pricing-table-column-inner');
	var name = column.querySelector('.eapps-pricing-table-column-title-text').innerText;
  
  if ( name === "Beast hinnakiri" ) return;
  
  output.push({
    name,
    price: {
      km: parseFloat( column.querySelector('.eapps-pricing-table-column-features-item:nth-child(6) .eapps-pricing-table-column-features-item-text').innerText ),
      minute: parseFloat( column.querySelector('.eapps-pricing-table-column-features-item:nth-child(2) .eapps-pricing-table-column-features-item-text').innerText ),
      day: parseFloat( column.querySelector('.eapps-pricing-table-column-features-item:nth-child(3) .eapps-pricing-table-column-features-item-text').innerText ),
      threeDays: parseFloat( column.querySelector('.eapps-pricing-table-column-features-item:nth-child(4) .eapps-pricing-table-column-features-item-text').innerText ),
      week: parseFloat( column.querySelector('.eapps-pricing-table-column-features-item:nth-child(5) .eapps-pricing-table-column-features-item-text').innerText ),
      start: parseFloat( column.querySelector('.eapps-pricing-table-column-features-item:nth-child(1) .eapps-pricing-table-column-features-item-text').innerText ),
      deposit: {
        base: parseFloat( column.querySelector('.eapps-pricing-table-column-features-item:nth-child(7) .eapps-pricing-table-column-features-item-text').innerText ),
        special: parseFloat( column.querySelector('.eapps-pricing-table-column-features-item:nth-child(8) .eapps-pricing-table-column-features-item-text').innerText ),
      }
    }
  });
});

copy( JSON.stringify( output ) );
```