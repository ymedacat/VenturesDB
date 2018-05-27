var fs = require('fs');
const neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("admin", "admin"));
const session = driver.session();
var array = [];
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('investorsbackground.txt', {encoding: 'utf8'})
});

lineReader.on('line', function (line) {  
  array.push(line);
  console.log(line);
  console.log(array.length);
	if (array.length==1997){
insert(1859);	
//console.log(array[1857]);
	}

  
});
	
	
function insert(loop){
//	for(var i=0;i<array.length;i++){
	//	for(var i=100;i<200;i++){
//	console.log(array.length);
	//console.log(array[loop]);
	const resultPromise = session.run(
	array[loop]
	);
	
	resultPromise.then(result => {
		console.log(result);
	
	session.close();
	driver.close();
		insert(loop+1); 	
	});
	

}
	

