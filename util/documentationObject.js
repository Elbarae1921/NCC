module.exports = {desc:"API Documentation",routes:[{route:'/api/person',desc:'search for a person by firstname, familyname, or city',method:'GET',param_type:'query',params:[{name:"firstName",required:false},{name:"familyName",required:false},{name:"city",required:false}],response:'json',example:'/api/person?firstName=John&familyName=Snow&city=Winterfell'},{route:'/api/checkin',desc:'check yourself in',method:'POST',param_type:'urlencoded form data',params:[{name:"firstName",required:true},{name:"familyName",required:true},{name:"city",required:true}],response:'json'},{route:'/api/weather',desc:'get the weather data of a city for up to 13 days',method:'GET',param_type:'query',params:[{name:"city",required:true}],response:'json',example:'/api/weather?city=Winterfell'},{route:'/api/organization/register',desc:'regitser organization to get an api key',method:'POST',param_type:'urlencodedformdata',params:[{name:"email",required:true},{name:"password",required:true},{name:"name",required:true},{name:"phone",required:true}],response:'json'},{route:'/api/organization/login', desc: 'organzation login to get api key',method:'POST',param_type:'urlencoded form data',params:[{name:"email",required:true},{name:"password",required:true}],response:'json'},{route:'/api/organization/checkin', desc: 'check a person in if you\'re an organization',method:'POST',param_type:'urlencodedformdata',header:'Authorization: Bearer <ORGANIZATION_KEY>',params:[{name:"firstName",required:true},{name:"familyName",required:true},{name:"city",required:true}],response:'json'}]}