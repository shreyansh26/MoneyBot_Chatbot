'use strict';

const Restify = require('restify');
const server = Restify.createServer({
  name: "MoneyBot"
});

const PORT = process.env.PORT || 3000;

server.use(Restify.bodyParser());
server.use(Restify.jsonp());

// Post route handler
server.post('/', (req, res, next) => {
  let {
    status,
    result
  } = req.body;

  if(status.code === 200 && result.action === 'convert') {
    const {
      outputCurrency,
      amountToConvert
    } = result.parameters;

    // Check if input currency code === output currency code
    if(amountToConvert.currency === outputCurrency) {
      const {
        amount,
        currency
      } = amountToConvert;

      let responseText = `Well, ${amount} ${outputCurrency} is obviously equal to ${amount} ${outputCurrency}!`;

      res.json({
        speech: responseText,
        displayText: responseText,
        source: "moneybot-webhook"
      });
    } else {
      // Query the fixer.io API to fetch response
      
    }
  }
  console.log(result);

  return next();
});

server.listen(PORT, () => console.log(`MoneyBot running on ${PORT}`));
