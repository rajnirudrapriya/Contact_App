const {Router}=require("express");
const router=Router();
const contactSchema=require("../model/contactSchema")

//create contacts 
router.get("/addContact", (req,res)=>{
    res.render('contact/addContact', {title:"Add Contact", css:"addContact"})
})

router.post("/addContact", async (req, res) => {
    await contactSchema.create(req.body)
    res.redirect('/', 302, {})
});

//fetch all contacts
router.get('/fetchContact', async (req, res) => {
    let payload = await contactSchema.find().lean();    //handlebars can't access data directly, so to convert the database object into plain javascript object, we use lean().
    res.render('contact/allContacts', { title: 'All_Contacts', payload, css: 'allContacts' })
})

//to fetch single contact
router.get('/:id', async (req, res) => {    //id is the unique identifier to get a particular contact
    let payload = await contactSchema.findOne({ _id: req.params.id }).lean();
    res.render('contact/singleContact', { title: 'Single_Contact', payload, css: 'singleContact' })
})

//to edit a contact
router.get('/edit/:id', async (req, res) => {    //id is the unique identifier to get a particular contact
    let payload = await contactSchema.findOne({ _id: req.params.id }).lean();
    res.render('contact/editContact', { title: 'Edit_Contact', payload, css: 'editContact' })
})

router.post("/edit/:id", async (req, res) => {
    let payload = await contactSchema.findOne({ _id: req.params.id });
    payload.fname = req.body.fname;
    payload.lname = req.body.lname;
    payload.nmbr = req.body.nmbr;
    payload.loc = req.body.loc;

    payload.save(); //To save the change/updation in data

    res.redirect('/api/fetchContact')
})

//delete a contact
router.get('/delete/:id', async (req, res) => {
    await contactSchema.deleteOne({ _id: req.params.id });
    res.redirect('/api/fetchContact');
})

module.exports=router;