const Ziggy = {
    "url": "http:\/\/localhost", "port": null, "defaults": {}, "routes": {
        "sanctum.csrf-cookie": {"uri": "sanctum\/csrf-cookie", "methods": ["GET", "HEAD"]},
        "ignition.healthCheck": {"uri": "_ignition\/health-check", "methods": ["GET", "HEAD"]},
        "ignition.executeSolution": {"uri": "_ignition\/execute-solution", "methods": ["POST"]},
        "ignition.updateConfig": {"uri": "_ignition\/update-config", "methods": ["POST"]},
        "dashboard": {"uri": "dashboard", "methods": ["GET", "HEAD"]},
        "user.verify": {"uri": "user\/verify\/{token}", "methods": ["GET", "HEAD"], "parameters": ["token"]},
        "employee.index": {"uri": "employee", "methods": ["GET", "HEAD"]},
        "employee.create": {"uri": "employee\/create", "methods": ["GET", "HEAD"]},
        "employee.store": {"uri": "employee", "methods": ["POST"]},
        "employee.show": {
            "uri": "employee\/{employee}",
            "methods": ["GET", "HEAD"],
            "parameters": ["employee"],
            "bindings": {"employee": "id"}
        },
        "employee.edit": {
            "uri": "employee\/{employee}\/edit",
            "methods": ["GET", "HEAD"],
            "parameters": ["employee"],
            "bindings": {"employee": "id"}
        },
        "employee.update": {
            "uri": "employee\/{employee}",
            "methods": ["PUT", "PATCH"],
            "parameters": ["employee"],
            "bindings": {"employee": "id"}
        },
        "employee.destroy": {
            "uri": "employee\/{employee}",
            "methods": ["DELETE"],
            "parameters": ["employee"],
            "bindings": {"employee": "id"}
        },
        "timesheet.index": {"uri": "timesheet", "methods": ["GET", "HEAD"]},
        "timesheet.create": {"uri": "timesheet\/create", "methods": ["GET", "HEAD"]},
        "timesheet.store": {"uri": "timesheet", "methods": ["POST"]},
        "timesheet.show": {"uri": "timesheet\/{timesheet}", "methods": ["GET", "HEAD"], "parameters": ["timesheet"]},
        "timesheet.edit": {
            "uri": "timesheet\/{timesheet}\/edit",
            "methods": ["GET", "HEAD"],
            "parameters": ["timesheet"]
        },
        "timesheet.update": {"uri": "timesheet\/{timesheet}", "methods": ["PUT", "PATCH"], "parameters": ["timesheet"]},
        "timesheet.destroy": {"uri": "timesheet\/{timesheet}", "methods": ["DELETE"], "parameters": ["timesheet"]},
        "checkin": {"uri": "checkin", "methods": ["GET", "HEAD"]},
        "checkin.store": {"uri": "checkin", "methods": ["POST"]},
        "checkout": {"uri": "checkout", "methods": ["GET", "HEAD"]},
        "checkout.store": {"uri": "checkout", "methods": ["POST"]},
        "profile.edit": {"uri": "profile", "methods": ["GET", "HEAD"]},
        "profile.update": {"uri": "profile", "methods": ["PATCH"]},
        "profile.destroy": {"uri": "profile", "methods": ["DELETE"]},
        "register": {"uri": "register", "methods": ["GET", "HEAD"]},
        "login": {"uri": "login", "methods": ["GET", "HEAD"]},
        "password.request": {"uri": "forgot-password", "methods": ["GET", "HEAD"]},
        "password.email": {"uri": "forgot-password", "methods": ["POST"]},
        "password.reset": {"uri": "reset-password\/{token}", "methods": ["GET", "HEAD"], "parameters": ["token"]},
        "password.store": {"uri": "reset-password", "methods": ["POST"]},
        "verification.notice": {"uri": "verify-email", "methods": ["GET", "HEAD"]},
        "verification.verify": {
            "uri": "verify-email\/{id}\/{hash}",
            "methods": ["GET", "HEAD"],
            "parameters": ["id", "hash"]
        },
        "verification.send": {"uri": "email\/verification-notification", "methods": ["POST"]},
        "password.confirm": {"uri": "confirm-password", "methods": ["GET", "HEAD"]},
        "password.update": {"uri": "password", "methods": ["PUT"]},
        "logout": {"uri": "logout", "methods": ["POST"]}
    }
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export {Ziggy};
