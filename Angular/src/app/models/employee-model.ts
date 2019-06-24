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
        viewWorkTimeButton: boolean = false,
        employeeError: string = null,
        workTimes: [] = null
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
    }
    viewWorkTimeButton: boolean = false;
    employeeError: string = null;
    workTimes: string[] = null;



    if(data) {
        this.viewWorkTimeButton = this.data.work.checked;
        this.employeeError = null;
        this.workTimes = null;
    }


    // calculating work time
    calculateWorkTimes() {
        this.workTimes = [];
        // console.log(workTimes);

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

            var workString: string = houres + "h " + minutes + "m " + seconds + "s";
            this.workTimes.push(workString);

        });

    }
}
