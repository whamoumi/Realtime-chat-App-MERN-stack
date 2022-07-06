const Userschema = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
	try{
		const {username, email, password} = req.body
		const usernameCheck = await Userschema.findOne({username})
		if (usernameCheck){
			return res.json({msg: "Username already user", status: false })
		}
		const emailCheck = await Userschema.findOne({email})
		if (emailCheck){
			return res.json({msg: "email already user", status: false })
		}
		const hashedPassword = await bcrypt.hash(password, 10)
		bcrypt.compare("Wawaham0h6510**",hashedPassword, (err, res) => {
			console.log(res)
		})
		const user = await Userschema.create({
			username, 
			email,
			password: hashedPassword
		})
		delete Userschema.password
		return res.json({status: true, user})
	} catch(error){
		console.log("Voici une erreur dans register ", error)
	}
}

module.exports.login = async (req, res, next) => {
	try{
		const {username, password} = req.body
		const user = await Userschema.findOne({username})
		if (user){
			bcrypt.compare(password, user.password, (err, ress) => {
				if (ress === true){
					delete user.password
					return res.json({status: true, user})
				}
				else{
					return res.json({status: false, msg: "not the good password"})
				}
			})
		}
		else{
			return res.json({status: false, msg: "not found the username"})
		}
	}
	catch (err){
		console.log(err)
	}
}

module.exports.setAvatar = async (req, res, next) => {
	try{
		const userId = req.params.id
		const avatar = req.body
		const user = await Userschema.findByIdAndUpdate(userId, {
			isAvatarImageSet: true,
			avatarImage: avatar.image
		})

		return res.json({isSet:user.isAvatarImageSet, image: user.avatarImage})
	}
	catch (err){
		console.log(err)
	}
}


module.exports.getAllUser = async (req, res, next) => {
	try{
		const users = await Userschema.find({_id: {$ne: req.params.id}}).select([
			"email", "username", "avatarImage", "_id"
		])

		return res.json(users)
	}
	catch (err){
		console.log(err)
	}
}