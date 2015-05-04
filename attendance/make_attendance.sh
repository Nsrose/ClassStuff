## Creates a new attendance web app. 

if [ "$#" -ne 2 ]; then
    echo "Usage: source make_attendance.sh <App Name> <App ID>"
else
    app_name="$1"
    app_id="$2"
    if [ ! -d "$app_name" ]; then
        cp -r AttendanceAppTemplate $app_name
        python create_attendance.py $app_name $app_id
        cd $app_name
        appcfg.py --oauth2 update ../$app_name
        cd ..
        echo Attendance app $app_name created.
    else
        echo Error: application $app_name already exists.
    fi 
fi



    