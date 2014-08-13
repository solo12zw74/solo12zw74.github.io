var searchButtonElement;
var searchInputElement;
var dataStore;
var resultsTable;

$(document).ready(function(){

	searchButtonElement = $('#searchButton');
	searchInputElement = $('#searchInput');

	searchButtonElement.on('click', doSearch);
	searchInputElement.keypress(function(e) {
		if(e.which == 13) {
			doSearch();
		}
	});

	initBackendless();
	initDataTable();

	function initBackendless(){
		Backendless.initApp('C90AB8DD-C479-4808-FFA4-BC6AF9585300', 'F8A39CC5-13E9-C319-FF13-15653E9DD000', 'v1');
		dataStore = Backendless.Persistence.of(ipoteka);
	}

	function initDataTable(){

		resultsTable = $('#resultsTable').DataTable( {
			"searching": false,
			"lengthChange": false,
			"info": false,
			"paging": false,
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

	function doSearch()
	{
		resultsTable.clear().draw();
		var nm = searchInputElement.val();
		if (!nm)
			return;
		if (nm.length < 5)
			return;

		var query = {
		   //condition: "name LIKE '%"+encodeURI(nm)+"%'"
		   condition: "name LIKE '%"+nm+"%'"
		};
		searchButtonElement.attr('disabled','disabled');
		
		dataStore.find(query, new Backendless.Async(searchSuccess, searchFault));
	}

	function searchSuccess(result){
		searchButtonElement.removeAttr('disabled');
		if (!result.data.length) {
			$('#notFoundModal').modal('show');
		}
		
		resultsTable.rows.add(result.data).draw();
	}
	function searchFault(error){

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
