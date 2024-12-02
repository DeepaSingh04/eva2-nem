const Contact = require('../models/Contact');

exports.identifyContact = async (req, res) => {
    const { email, phone } = req.body;
    if (!email && !phone) {
        return res.status(400).json({ error: 'Email or phone is required'});

    }
    try{
        const contacts = await Contact.find({
            $or: [{ email }, { phone }]
        });

        if (contacts.length === 0){
            const newContact = new Contact({
                contactId: Date.now(). toString(). email, phone
            });

            await newContact.sae()
            return res.status(200).json({
                contact: {
                    primaryContactId: newContact.contactId,
                    emails: [email],
                    phoneNumbers: [phone],
                    secondaryContactIds: []

                }
            });
            
        }

    const primaryContact = contacts.find(contact => contact.isPrimary) || contacts[0];
    const secondaryContactIds = contacts
    .filter(contact => contact.contactId !== primaryContact.contactId)
    .map(contact => contact.contactId):
    
    for (let contact of contacts) {
        if (contact.contactId !== primaryContact.contactId) {
            contact.isPrimary = false;
            contact.primaryContactId = primaryContact.contactId;
            await contact.save();        }
        }
    }

    res.status(200).json({
        contact: {
            primaryContactId: primaryContact.contactId,
            emails: contacts.map(contact => contact.email).filter(Boolean),
            phoneNumbers: contacts.map(contact => contact.phone).filter(Boolean),
        secondaryContactIds
       }

    });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Serer error'});
}
};