

app.use();

//Index Route
app.get('/', (req, res) => {
    res.send('INDEX SALE PAGE')
});
//District Route
app.get('/district', (req, res) => {
    res.send('DISTRICT PAGE')
});
//Region Route
app.get('/region', (req, res) => {
    res.send('REGION PAGE')
});
//Apps Route
app.get('/application', (req, res) => {
    res.send('APP PAGE')
});


