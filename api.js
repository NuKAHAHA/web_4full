const axios = require('axios');
const YOUR_RAPIDAPI_KEY = "68915ed042msh2b157ff89f4020dp14b020jsn76fe01fb6da0";
const FTBLNEW_KEY = "9ca3a28ed1msh04c032d4660f787p14d241jsne5e26423507f";




async function getLaLigaNews() {

    const options = {
        method: 'GET',
        url: 'https://football-news-aggregator-live.p.rapidapi.com/news/fourfourtwo/laliga',
        headers: {
            'X-RapidAPI-Key': '9ca3a28ed1msh04c032d4660f787p14d241jsne5e26423507f',
            'X-RapidAPI-Host': 'football-news-aggregator-live.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const responseData = response.data;

        if (Array.isArray(responseData)) {
            return responseData;
        } else {
            console.error('Received unexpected response format:', responseData);
            return null;
        }
    } catch (error) {
        console.error('Error fetching La Liga news:', error);
        return null;
    }
}


async function getTeamInfo(teamName) {
    const options = {
        method: 'GET',
        url: 'https://heisenbug-la-liga-live-scores-v1.p.rapidapi.com/api/laliga/team',
        params: { name: teamName },
        headers: {
            'X-RapidAPI-Key': YOUR_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'heisenbug-la-liga-live-scores-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error fetching team info:', error);
        return null;
    }
}




module.exports = {
    getTeamInfo, getLaLigaNews
};