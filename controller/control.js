const userDB = require("../models/userSchema");
const fs = require('fs')

const indexPage = async (req, res) => {
    try {
        res.render('index')
    } catch (error) {
        console.log(error);
        return false
    }
}

const viewPage = async (req, res) => {
    try {

        const data = await userDB.find();

        res.render('view', { data });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addPage = async (req, res) => {
    try {
        res.render('add')
    } catch (error) {
        console.log(error);
        return false
    }
}

const editPage = async (req, res) => {
    try {
        res.render('edit')
    } catch (error) {
        console.log(error);
        return false
    }
}

const insertData = async (req, res) => {

    const { name, genre, desc, date, rating, time, id } = req.body;

    try {
        if (id) {
            if (req.file) {
                let image = req.file.path;
                try {
                    const data = await userDB.findById(id);
                    fs.unlinkSync(data.image);
                } catch (err) {
                    console.log(err);
                    return false;
                }
                try {
                    await userDB.findByIdAndUpdate(id, { name, genre, desc, date, rating, time, image });
                    return res.redirect('view');
                } catch (err) {
                    console.log(err);
                    return false;
                }
            } else {
                try {
                    const data = await userDB.findById(id);
                    let image = data.image;
                    await userDB.findByIdAndUpdate(id, { name, genre, desc, date, rating, time, image });
                    return res.redirect('view');
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }
        } else {
            let image = req.file.path;
            try {
                await userDB.create({ name, genre, desc, date, rating, time, image });
                return res.redirect('view');
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    } catch (err) {
        console.log(err);
        return false;
    }


}

const editData = async (req, res) => {

    let { id } = req.params;

    try {
        const data = await userDB.findById(id);
        console.log(data);
        return res.render('edit', { data });
    } catch (err) {
        console.log(err);
        return false;
    }

}

const deleteData = async (req, res) => {
    let { id } = req.params

    try {
        const data = await userDB.findById(id);
        fs.unlinkSync(data.image);
        await userDB.findByIdAndDelete(id);
        console.log("Movie Deleted Successfully");
        return res.redirect('/view');
    } catch (err) {
        console.log(err);
        return false;
    }

}

module.exports = { indexPage, viewPage, addPage, insertData, editData, deleteData, editPage }