const Color = require('../model/Color.js');

module.exports = {
    async store(req, res) {
        const { name, color_1, color_2, color_3, color_4, colorBase } = req.body;
        let { createdBy } = req.body;

        if (!color_1 || !color_2 || !color_3 || !color_4 || !name)
            return res.status(400).send();

        try {
            const response = await Color.create({
                name,
                color_1,
                color_2,
                color_3,
                color_4,
                colorBase,
                createdBy,
                reactions: {
                    loves: 0,
                    v_hand: 0,
                    wow: 0
                }
            });
            res.status(200).json(response);
        } catch (err) {
            res.status(500).send('There was an error registering your palette. Try again.');
        }
    },
    async index(req, res) {
        const { page = 1 } = req.query;
        try {
            const response = await Color.find()
                .limit(30)
                .skip((page - 1) * 30)
                .sort({ _id: -1 })
            res.status(200).json(response);
        } catch (err) {
            res.status(500).send('There was an error listing palettes. Try again.');
        }
    },
    async editReaction(req, res) {
        const { id, reaction } = req.query;
        const palette = await Color.findById(id);

        const lovesValue = palette.reactions.loves;
        const v_handValue = palette.reactions.v_hand;
        const wowValue = palette.reactions.wow;

        const update = {
            loves: lovesValue,
            v_hand: v_handValue,
            wow: wowValue
        };
        if (reaction == 'loves') {
            update.loves = update.loves + 1;
        } else if (reaction == 'v_hand') {
            update.v_hand = update.v_hand + 1;
        } else if (reaction == 'wow') {
            update.wow = update.wow + 1;
        } else {
            return res.status(400).send('Reaction does not exist');
        }

        try {
            const response = await Color.findByIdAndUpdate(id, { reactions: update });
            res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async searchColors(req, res) {
        const { searchparam } = req.query;
        console.log(searchparam);

        try {
            const response = await Color.aggregate([
                {
                    $match: {
                        $or: [
                            { name: searchparam },
                            { colorBase: searchparam },
                            { color_1: `#${searchparam.toLowerCase()}` },
                            { color_2: `#${searchparam.toLowerCase()}` },
                            { color_3: `#${searchparam.toLowerCase()}` },
                            { color_4: `#${searchparam.toLowerCase()}` },
                            { color_1: `${searchparam.toLowerCase()}` },
                            { color_2: `${searchparam.toLowerCase()}` },
                            { color_3: `${searchparam.toLowerCase()}` },
                            { color_4: `${searchparam.toLowerCase()}` }
                        ]
                    }
                },
            ]);
            res.json(response);
        } catch (err) {
            res.status(400).send('There is an error. Try again.');
        }
    },
}