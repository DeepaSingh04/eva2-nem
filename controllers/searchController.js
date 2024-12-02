const Contact = require('../models/Contact');

exports. searchContacts = async (req, res) => {
    const { email, phone, page = 1, limit = 10 } = req.query;

    try{
        const query = { isPrimary: true };
        if (email) query.email = email;
        if (phone) query.phone = phone;
        
        const contacts = await Contact.find(query)

              .skip((page - 1) * limit)
              .limit(parseInt(limit));
        
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error '});
    }
};