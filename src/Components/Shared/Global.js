class Global {
    constructor() {
      this.NewsUrl = 'https://newsapi.org/';
      this.NewsApiKey= 'xxx';

      this.FootballUrl = 'https://apifootball.com/api/';
      this.FootballApiKey= 'xxx';
      this.FootballDefaultCountryId= 0;
      this.FootballDefaultLeagueId= 0;

      this.EventBaseUrl= 'https://api.predicthq.com/v1/';
      this.EventApiToken= 'xxx';

      this.FootballUrl2 = 'http://api.football-data.org/v1/';
      this.FootballApiKey2 = 'xxx';

      this.CricketApiUrl = 'http://cricapi.com/api/';
      this.CricketApiKey = 'xxx';

      
    }
  }
  
  export default (new Global());