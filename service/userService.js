

export const formatUser = (userData) => {
    return {
        userId: userData.id,
        username:userData.username,
        email:userData.email,
    }
}