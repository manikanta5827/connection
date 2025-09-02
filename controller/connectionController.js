import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sendConnectionRequest = async(req,res) => {
    const senderId = req.userId;
    let receiverId = req.get('receiverId');

    if(!receiverId) {
        return res.status(400).json({
            success: 'error',
            message: "receiver is required"
        });
    }
    receiverId = Number(receiverId);
    if(isNaN(receiverId)) {
        return res.status(400).json({
            success: 'error',
            message: "receiver id should be a integer"
        });
    }

    if(senderId === receiverId) {
        return res.status(400).json({
            status: "error",
            message: "you can't send request to yourself"
        })
    }

    const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
    if (!receiver) {
        return res.status(404).json({ 
            status: "error",
            message: "receiver not found"
        });
    }

    const existing = await prisma.connection.findFirst({
        where: { senderId, receiverId }
    });
  
    if (existing && existing.status === 'PENDING') {
        return res.status(400).json({ 
            status: "error",
            message : "Connection request already exists"
        });
    }

    if (existing && existing.status === 'ACCEPTED') {
        return res.status(400).json({ 
            status: "error",
            message : "you both are already friends"
        });
    }

    if (existing && existing.status === 'REJECTED') {
        await prisma.connection.update({
            where: { senderId_receiverId: { senderId, receiverId } },
            data: { status: 'PENDING' }
        });
        return res.status(201).json({
            success: 'success',
            message: "Connection request re-sent"
        });
    }

    await prisma.connection.create({ data: { senderId, receiverId } });

    return res.status(201).json({
        success: 'success',
        message: "Connection request sent"
    });
}

export const acceptConnectionRequest = async (req,res) => {
    const userId = req.userId;
    let connectionId = req.get('connectionId');

    if(!connectionId) {
        return res.status(400).json({
            success: 'error',
            message: "receiver is required"
        });
    }
    connectionId = Number(connectionId);
    if(isNaN(connectionId)) {
        return res.status(400).json({
            success: 'error',
            message: "receiver id should be a integer"
        });
    }

    const connection = await prisma.connection.findUnique({ where: { id: connectionId } });
    if (!connection) {
        return res.status(404).json({ 
            status : "error",
            message : 'Connection request not found'
        });
    }

    if (connection.receiverId !== userId) {
        return res.status(403).json({ 
           status : "error",
           message : 'Not authorized to accept this request'
        });
    }

    await prisma.connection.update({
      where: { id: connectionId },
      data: { status: "ACCEPTED" }
    });

    return res.json({
      success: true,
      message: "Connection request accepted"
    });
}

export const rejectConnectionRequest = async (req, res) => {
    const userId = req.userId;
    let connectionId = req.get('connectionId');

    if(!connectionId) {
        return res.status(400).json({
            success: 'error',
            message: "receiver is required"
        });
    }
    connectionId = Number(connectionId);
    if(isNaN(connectionId)) {
        return res.status(400).json({
            success: 'error',
            message: "receiver id should be a integer"
        });
    }

    const connection = await prisma.connection.findUnique({ where: { id: connectionId } });
    if (!connection) {
        return res.status(404).json({ 
            status : "error",
            message : 'Connection request not found'
        });
    }

    if (connection.receiverId !== userId) {
        return res.status(403).json({ 
            status : "error",
            message : 'Not authorized to accept this request'
        });
    }

    await prisma.connection.update({
        where: { id: connectionId },
        data: { status: "REJECTED" }
    });

    return res.json({
        success: true,
        message: "Connection request rejected"
    });
};

export const getPendingRequests = async (req,res) => {
    const userId = req.userId;

    const pending = await prisma.connection.findMany({
      where: { receiverId: userId, status: "PENDING" },
      include: {
        sender: { select: { id: true, username: true, email: true } }
      }
    });

    return res.json({ success: true, pending });
}
  
export const getFriendsList = async (req, res) => {
    const userId = req.userId;
  
    const friends = await prisma.connection.findMany({
        where: {
        status: "ACCEPTED",
        OR: [{ senderId: userId }, { receiverId: userId }]
        },
        include: {
        sender: { select: { id: true, username: true, email: true } },
        receiver: { select: { id: true, username: true, email: true } }
        }
    });

    const result = friends.map(c =>
        c.senderId === userId ? c.receiver : c.sender
    );

    return res.json({ 
        success: "success", 
        friends: result 
    });
};
