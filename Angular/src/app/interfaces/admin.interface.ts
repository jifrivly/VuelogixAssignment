export interface AdminInterface {
    _id: String,
    name: String,
    position: String,
    work: {
        checked: Boolean,
        firstDay: String,
        lastCheckTime: String,
        workTime: [String]
    },
    leave: {
        inLeave: Boolean

    },
    email: String,
    password: String
}
