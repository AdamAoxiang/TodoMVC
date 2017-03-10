(function(angular){
	angular
		.module('myApp.controller',[])
		.controller('MyController',['$scope','$location','DataService',MyController]);
	 function MyController($scope,$location,DataService){
	 	var vm=$scope;
		
		vm.taskList=DataService.getData();
	
	// 添加任务
	vm.newTask=''
	vm.add=function(){
		if(vm.newTask.trim()===''){
			return;
		}
		var id,len=vm.taskList.length;
		if(len===0){
			id=1
		}else{
			id=vm.taskList[len-1].id+1
		}
		vm.taskList.push({id:id,name:vm.newTask,isCompleted:false});
		vm.newTask='';
	}
	//删除任务
	vm.remove=function(id){
		for(var i=0;i<vm.taskList.length;i++){
			var task=vm.taskList[i];
			if(task.id===id){
				vm.taskList.splice(i,1)
			}
		}
	}
	//修改任务
	vm.editId=0;
	vm.edit=function(id){
		vm.editId=id;
	}
	vm.update=function(){
		vm.editId=0;
	}
	//切换状态
	vm.allChecked=false;
	vm.checkAll=function(){
		vm.taskList.forEach(function(task){
			task.isCompleted=vm.allChecked;
		})
	}
	//清除已完成的任务
	vm.clearAll=function(){
		var temp=[];
		for(var i=0;i<vm.taskList.length;i++){
			if(!vm.taskList[i].isCompleted){
				temp.push(vm.taskList[i])
			}
		}
		vm.taskList=temp;
	}
	vm.isShow=false;
	vm.$watch('taskList',function(n,o){
		var temp=false;
		for(var i=0;i<vm.taskList.length;i++){
			if(vm.taskList[i].isCompleted){
				temp=true;
				break;
			}
		}
		vm.isShow=temp
	},true)
	//显示未完成的任务
	vm.unCompleted=function(){
		var count=0;
		vm.taskList.forEach(function(task){
			if(!task.isCompleted){
				count++;
			}
		})
		return count;
	}
	// 显示不同状态
	vm.selectedStatus={isCompleted:undefined}
	vm.location=$location;
	vm.$watch('location.url()',function(n,o){
		switch(n){
			case '/':
			vm.selectedStatus={isCompleted:undefined};
			break;
			case '/active':
			vm.selectedStatus={isCompleted:false};
			break;
			case '/completed':
			vm.selectedStatus={isCompleted:true};
			break;
			}
		})

	}

})(angular)