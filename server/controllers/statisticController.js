const statisticController = {
     /**
     * It is used to fetch Dashboard Statistics
     */
    getDashboardData: async(req, res) => {
        try {
            return res.status(200).send({
                status: 200,
                data: {
                    student_enrolled: 23,
                    active_training: 30,
                    today_registration: 12,
                    average_training_spent_time: '2 Hrs',
                    average_activation_fallout_time: '30 Mins',
                    total_revenue: "₹ 120000"
                }
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Something Went Wrong"
            });
        }
    }
}

module.exports = statisticController;