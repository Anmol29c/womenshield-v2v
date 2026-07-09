exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }
        res.status(201).json({
            success: true,
            message: "User registered successfully (Demo Active)",
            user: { name, email, phone }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        res.status(200).json({
            success: true,
            message: "User logged in successfully (Demo Active)"
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
