$(document).ready(function(){


	$('#search').on('click', onClick);

	var dataStore;
	var resultsTable;
	initBackendless();
	initDataTable();

	function initBackendless(){
		Backendless.initApp('C90AB8DD-C479-4808-FFA4-BC6AF9585300', 'F8A39CC5-13E9-C319-FF13-15653E9DD000', 'v1');
		dataStore = Backendless.Persistence.of(ipoteka);
	}

	function initDataTable(){

		resultsTable = $('#resultsTable').DataTable( {
			"searching": false,
			"paging": false,
			"lengthChange": false,
			"info": false,
			"columns": [
			{ data: "name" },
			{ data: "city" },
			{ data: "number" }				
			],
			"language": {
				"emptyTable": "Нет данных для отображения"
			}
		} );
	}

	function onClick(){
		var nm = $('input#searchVal').val();
		if (!nm)
			return;
		if (nm.length < 5)
			return;

		var query = {
			   //condition: "name LIKE '%"+encodeURI(nm)+"%'"
			   condition: "name LIKE '%"+nm+"%'"
			};
			var records = dataStore.find(query);			
			resultsTable.clear();
			resultsTable.rows.add(records.data).draw();
	}

	function ipoteka(args) {
		args = args || {};
		this.dt = args.dt || "";
		this.updated = args.updated || "";
		this.created = args.created || "";
		this.objectId = args.objectId || "";
		this.ownerId =  args.ownerId || "";
		this.name = args.name || "";
		this.number = args.number || "";
		this.isProgram =  args.isProgram || "";
		this.isProgram1 =  args.isProgram1 || "";
		this.hasDocs =  args.hasDocs || "";
		this.city =  args.city || "";
		this.toString = function(){
			return this.name+' ('+this.city+')';
		}
	}

	});
