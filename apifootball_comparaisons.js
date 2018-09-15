                                    //We use the APIs from https://apifootball.com/documentation/                             

                                    //API_Key
var API_Key = "";

                                    //Librairies

//We use the librairy request.
var request = require("request");

//We use the librairy string.
var String = require("string");


                                    //Global variables

//Scores of each team from the beginning.
var scoreEquipe1 = 0;
var scoreEquipe2 = 0;


                                    //Methodes of comparaison of the teams

//We compare their position.
var position = function( a, b)
{
    //If the team 1 has a better postion than the team 2, so the team 1 wins 1 point.
    if (a < b)
        {
            scoreEquipe1 += 1;
        }
    
    else
        {
            scoreEquipe2 += 1;
        }   
};

//We compare their number of won plays.
var matchsGagnes = function (a, b)
{
    //If the team 1 won more plays than the team 2, so the team 1 wins 1 point.
    if (a > b)
        {
            scoreEquipe1 += 1;
        }
    
    //If the team 1 won the same number of plays than the team 2, so both teams win 1 point.
    else if (a == b)
        {
            scoreEquipe1 += 1;
            scoreEquipe2 += 1;
        } 
    
    else
        {
            scoreEquipe2 += 1;
        } 
};

//We compare their number of lost plays.
var matchsPerdus = function (a, b)
{
    //If the team 1 lost more plays than the team 2, so the team 2 wins 1 point.
    if (a > b)
        {
            scoreEquipe2 += 1;
        }
    
    //Else if the team 1 lost the same number of plays than the team 2, so both teams win 1 point.
    else if (a == b)
        {
            scoreEquipe1 += 1;
            scoreEquipe2 += 1;
        } 
    
    else
        {
            scoreEquipe1 += 1;
        } 
};

//We compare their number of draws.
var matchsNuls = function (a, b)
{
    //If Team 1 made more draws than Team 2, then Team 2 wins 1 point.
    if (a > b)
        {
            scoreEquipe2 += 1;
        }
    
    //If Team 1 has the same number of draws as Team 2, then both win 1 point.
    else if (a == b)
        {
            scoreEquipe1 += 1;
            scoreEquipe2 += 1;
        } 
    
    else
        {
            scoreEquipe1 += 1;
        } 
};

//We compare their number of goals scored.
var butsPour = function (a, b)
{
    //If Team 1 has more goals scored than Team 2, then Team 1 wins 1 point.
    if (a > b)
        {
            scoreEquipe1 += 1;
        }
    
    //Otherwise if Team 1 has the same number of goals for Team 2, then both win 1 point.
    else if (a == b)
        {
            scoreEquipe1 += 1;
            scoreEquipe2 += 1;
        } 
    
    else
        {
            scoreEquipe2 += 1;
        } 
};

//We compare their number of goals conceded.
var butsContre = function (a, b)
{
    //If Team 1 has more goals conceded than Team 2, then Team 2 wins 1 point.
    if (a > b)
        {
            scoreEquipe2 += 1;
        }
    
    //If Team 1 has the same number of goals as Team 2, then both win 1 point.
    else if (a == b)
        {
            scoreEquipe1 += 1;
            scoreEquipe2 += 1;
        } 
    
    else
        {
            scoreEquipe2 += 1;
        } 
};

//We compare the teams on their last meetings.
var resultatsDernieresRencontres = function(a, b, c)
{
     request("https://apifootball.com/api/?action=get_events&from=2014-01-01&to=2017-05-27&league_id=" + c + "&APIkey=" + API_Key, function(error, response, body)
                {
                    var events = JSON.parse(body);
         
                    var matchs = [];
         
                    for(var i = 0; i<events.length; i++)
                        {
                            matchs[i] = events[i];
                        }
                    
                    for (var i = 0; i<matchs.length; i++)
                        {
                            if (a == matchs[i].match_hometeam_name && b == matchs[i].match_awayteam_name )
                                {
                                    if( matchs[i].match_hometeam_score > matchs[i].match_awayteam_score)
                                        {
                                            scoreEquipe1 += 1;
                                        }
                                    
                                    else if (matchs[i].match_hometeam_score == matchs[i].match_awayteam_score)
                                        {
                                            scoreEquipe1 += 1;
                                            scoreEquipe2 += 1;
                                        }
                                        
                                    else
                                        {
                                            scoreEquipe2 += 1;
                                        }
                                }
                            
                            else if (b == matchs[i].match_hometeam_name && a == matchs[i].match_awayteam_name)
                                {
                                    if( matchs[i].match_hometeam_score > matchs[i].match_awayteam_score)
                                        {
                                            scoreEquipe2 += 1;
                                        }
                                    
                                    else if (matchs[i].match_hometeam_score == matchs[i].match_awayteam_score)
                                        {
                                            scoreEquipe1 += 1;
                                            scoreEquipe2 += 1;
                                        }
                                        
                                    else
                                        {
                                            scoreEquipe1 += 1;
                                        }
                                 
                                }
                            
                            else
                                {
                                    //On ne fait rien.
                                }
                        }
                }
            );
};

//We compare the score of the two teams and we display the result of the match.
var resultatMatchs = function (a, b, c, d)
{
    
    if (a > b)
        {
            console.log("Rencontre entre " + c + " et " + d + " , Vanqueur : " + c);
        }
    
    else if (a == b)
        {
            console.log("Match nul entre equipe 1 : " + c + " et equipe 2 : " + d);
        }
    
    else
        {
            console.log("Rencontre entre " + c + " et " + d + " , Vanqueur : " + d);
        }
};

//The preceding methods are imbedded in a single function.
var methodeComparaisonEquipes = function (a, b, c)
{
    //We check the teams before starting the calculations.
    for (var i = 0; i<c.length ; i++)
        {
            if(a == c[i].team_name)
                {
                    a = c[i];
                }
            
            else if (b == c[i].team_name)
                {
                    b = c[i];
                }
                
            else
                {
                    //We do nothing.
                }
        }
    
                            //Position
    //Totale
    position(a.overall_league_position, b.overall_league_position);
    //Domicile
    position(a.home_league_position, b.home_league_position);
    //Exterieur
    position(a.away_league_position, b.away_league_position);
    
                            //Matchs gagnes
    //Totaux
    matchsGagnes(a.overall_league_W, b.overall_league_W);
    //Domicile
    matchsGagnes(a.home_league_W, b.home_league_W);
    //Exterieur
    matchsGagnes(a.away_league_W, b.away_league_W);
    
                            //Matchs nuls
    //Totaux
    matchsNuls(a.overall_league_D, b.overall_league_D);
    //Domicile
    matchsNuls(a.home_league_D, b.home_league_D);
    //Exterieur
    matchsNuls(a.away_league_D, b.away_league_D);
    
                            //Matchs perdus
    //Totaux
    matchsPerdus(a.overall_league_L, b.overall_league_L);
    //Domicile
    matchsPerdus(a.home_league_L, b.home_league_L);
    //Exterieur
    matchsPerdus(a.away_league_L, b.away_league_L);
    
                            //Buts contre
    //Totaux
    butsContre(a.overall_league_GA, b.overall_league_GA);
    //Domicile
    butsContre(a.home_league_GA, b.home_league_GA);
    //Exterieure
    butsContre(a.away_league_GA, b.away_league_GA);
    
                            //Buts pour
    //Totaux
    butsPour(a.overall_league_GF, b.overall_league_GF);
    //Domicile
    butsPour(a.home_league_GF, b.home_league_GF);
    //Exterieure
    butsPour(a.away_league_GF, b.away_league_GF);
    
                            //Resultat
    resultatMatchs(scoreEquipe1, scoreEquipe2, a.team_name, b.team_name);

};

//League 1 league information is requested with the GET method.
var predictionMatchs = function (league_id, a, b)
{
    //We retrieve the elements of the response of the request request_standings_ligue1.
    var classement = [];
    
    request("https://apifootball.com/api/?action=get_standings&league_id=" + league_id +"&APIkey=" + API_Key, function(error, response, body)
    {
        //We transform the body variable into JSON format to access the various elements of the answer.
        var standings = JSON.parse(body);

        //The elements of each team are stored in a table.
        for(var i = 0; i<standings.length ; i++)
            {
                classement[i] = standings[i];
            }
        
        //We ask the events on the last 5o meetings.
        
        //We fill the table with future meetings.
        var rencontres = [];

        request("https://apifootball.com/api/?action=get_events&from=2017-" + a + "-20&to=2017-" + b + "-30&league_id=" + league_id + "&APIkey=" + API_Key, function(error, response, body1)
        {
                //We transform the body variable into JSON format to access the various elements of the answer.
                var rencontresLigue = JSON.parse(body1);
                
                //We fill the table of meetings.
                for (var i = 0; i<rencontresLigue.length; i++)
                    {
                        rencontres[i] = rencontresLigue[i];
                    }
            
                
                //We go through the meetings.
                for (var i = 0; i<rencontres.length; i++)
                    {
                        console.log("Rencontre : " + rencontres[i].match_date + " " + rencontres[i].match_time + " " + rencontres[i].match_hometeam_name + " " + rencontres[i].match_awayteam_name + " " + rencontres[i].match_hometeam_score + " " + rencontres[i].match_awayteam_score);
                        
                        var a = rencontres[i].match_hometeam_name;
                        var b = rencontres[i].match_awayteam_name;
                        
                        resultatsDernieresRencontres(a, b, league_id);
                        
                        //We return the winner.
                        methodeComparaisonEquipes(a, b, classement);
                        
                        //Team scores are reset.
                        scoreEquipe1 = 0;
                        scoreEquipe2 = 0;
                        
                        console.log();
                    }
                    
                    //We display the fields.
                    //console.log(rencontres[0]);
        }
        );
    }
    );
};


                                //Leagues
                            //Main program 
//I predict the results of league games.
            
//Ligue 1
//predictionMatchs(127, 05, 06);

//Serie A (League id : 79)
//predictionMatchs(79, 05, 05);

//Liga BBVA : 109
predictionMatchs(109, 05, 05);

//Bundesliga : 117
//predictionMatchs(117, 05, 06);

//Eredivisie : 137
//predictionMatchs(137, 05, 06);

//Primeira liga : 150
//predictionMatchs(150, 05, 06);