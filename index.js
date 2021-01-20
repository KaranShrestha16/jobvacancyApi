const Express = require('express');
const port = process.env.PORT || 8001;
const userRoutes = require('./routes/users');
const orgRoutes = require('./routes/organization');
const jobRoutes = require('./routes/job');
const app = new Express();
const path = require('path');

app.use("/job_vacancy/v1/user",userRoutes);
app.use("/job_vacancy/v1/org",orgRoutes);
app.use("/job_vacancy/v1/job",jobRoutes);

app.use(Express.static(path.join(__dirname, './images')));
// Handeling routes Error
app.use((req, res, next) => {
    const error = new Error("URL not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, function () {
    console.log("Listening on port: ", port);
});


