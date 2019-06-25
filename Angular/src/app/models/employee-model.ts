export class EmployeeModel {

    // cunstructor function
    constructor(
        data: {
            work: {
                workTime: [],
                checked: boolean,
                firstDay: string,
                lastCheckTime: string
            },
            leave: { inLeave: boolean },
            _id: string,
            name: string,
            position: string,
            email: string,
        },
        // viewWorkTimeButton: boolean = false,
        // employeeError: string = null,
        // workTimes: {} = null
    ) {
        this.data = data;
    }

    // declarations 
    data: {
        work: {
            workTime: [],
            checked: boolean,
            firstDay: string,
            lastCheckTime: string
        },
        leave: { inLeave: boolean },
        _id: string,
        name: string,
        position: string,
        email: string,
    };
    viewWorkTimeButton: boolean = false;
    employeeError: string = null;
    workTimes: object = {};


    if(data) {
        this.viewWorkTimeButton = this.data.work.checked;
        this.employeeError = null;
        this.workTimes = null;
    }


    // calculating work time
    calculateWorkTimes() {
        this.workTimes = [];
        // console.log(workTimes);

        var workDay = parseInt(this.data.work.firstDay);
        var month = new Date(workDay).getMonth() + 1;
        // var i = new Date(workDay).getFullYear() + " " + month;
        var i = 0;
        var dataOfMonth: object[] = [];
        this.data.work.workTime.forEach((t: any) => {
            // var time = t;
            // console.log("Time : " + t);
            var time = Math.round(t / 1000);
            // console.log("Total Seconds : " + time);


            var seconds = time % 60;
            // console.log("Seconds : " + seconds);

            time = Math.round(time / 60);
            var minutes = time % 60;
            // console.log("Minutes : " + minutes);

            time = Math.round(time / 60);
            var houres = time % 60;
            // console.log("Houres : " + houres);

            var workTimeString: string = houres + "h " + minutes + "m " + seconds + "s";

            if (new Date(workDay).getDate() == 1) {
                month = new Date(workDay).getMonth() + 1;
                // i = new Date(workDay).getFullYear() + " " + month;
                dataOfMonth = [];
                i++;
                // console.log(i)
            }
            var dataOfDay = {
                date: workDay,
                time: workTimeString
            }

            dataOfMonth.push(dataOfDay);

            this.workTimes[i] = dataOfMonth;

            // console.log(typeof this.workTimes)
            // console.log(typeof this.workTimes[i])
            // console.log(typeof this.workTimes[i])
            workDay = workDay + (24 * 60 * 60 * 1000);

        });


        // console.log(dataOfMonth);
        // console.log(this.workTimes);
    }




    // Class End
}
