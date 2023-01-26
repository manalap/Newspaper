const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")


const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function () {
    console.log("Server is running on port 3000")
})




app.post("/", function (req, res) {
    let firstName = req.body.fName
    let lastName = req.body.lName
    let email = req.body.email

    console.log(firstName + " " + lastName + " " + email)

    var data = {
        members: [
            { email_address: email, status: "subscribed", merge_fields: { FNAME: firstName, LNAME: lastName } }
        ]
    }



    var options = {
        url: "https://us9.api.mailchimp.com/3.0/lists/5543",
        method: "POST",
        headers: {
            "Authorization": "Man****************************"
        },
        body: JSON.stringify(data)
    }




    request(options, function (err, response, body) {
        if (err) {
            res.sendFile(__dirname + "/failur.html")
        } else {
            if (res.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failur.html")
            }
        }

    })
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")

})

app.post("/", function (req, res) {
    res.redirect("/")
})

// c597d854c30b8efc9022c881b481a14e - us9
// 554316bef9
