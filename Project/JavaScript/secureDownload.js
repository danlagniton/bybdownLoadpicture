// Mock data for users and their permissions
const users = [
    { id: 1, email: 'user1@example.com', hasAccess: true },
    { id: 2, email: 'user2@example.com', hasAccess: false }
];

// Function to generate a secure download link
function generateSecureLink(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.hasAccess) {
        throw new Error('User does not have permission to download this asset');
    }

    // Simulate link generation with expiration
    const expirationTime = Date.now() + 3600000; // 1 hour from now
    const secureLink = `https://example.com/download?userId=${userId}&expires=${expirationTime}`;
    
    return { link: secureLink, expires: expirationTime };
}

// Function to validate the download link
function validateDownloadLink(userId, expires) {
    const currentTime = Date.now();
    if (currentTime > expires) {
        throw new Error('Download link has expired');
    }
    const user = users.find(u => u.id === userId);
    if (!user || !user.hasAccess) {
        throw new Error('Invalid download attempt');
    }
    return true; // Link is valid
}

// Example usage
try {
    const { link, expires } = generateSecureLink(1);
    console.log('Secure Download Link:', link);
    
    // Simulate a download attempt
    validateDownloadLink(1, expires);
    console.log('Download successful');
} catch (error) {
    console.error('Error:', error.message);
}
