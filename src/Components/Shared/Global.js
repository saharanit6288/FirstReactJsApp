class Global {
    constructor() {
      this.NewsUrl = 'https://newsapi.org/';
      this.NewsApiKey= '817ce204f34c4ee19ed5ceec9d99c62b';

      this.FootballUrl = 'https://apifootball.com/api/';
      this.FootballApiKey= '4abeba83c246625ed6a39107daec6881704ae5f346a1c4ce8e70c59db4859011';
      this.FootballDefaultCountryId= 169;
      this.FootballDefaultLeagueId= 62;
    }
  }
  
  export default (new Global());