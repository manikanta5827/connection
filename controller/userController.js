import { findUserByName } from '../repository/userRepository.js';
import { formatUser } from '../service/userService.js';

export const getProfile = async (req,res) => {

    const username = req.get('username');

    if(!username) {
        return res.status(400).json({
            status: "error",
            message: "username is required"
        })
    }
    
    // find the user using the id
    const user = await findUserByName(username);

    if(!user) {
        return res.status(404).json({
            status: "failed",
            message: "user doesn't exist"
        })
    }
    
    const formattedData = formatUser(user);

    res.status(200).json(formattedData);
} 