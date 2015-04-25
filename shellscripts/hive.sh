function hive { 
    i="$1"
    re='^[0-9]+$'
    if ! [[ $i =~ $re ]] ; then
       echo "error: Not a number"
    elif [ "$1" -lt 1 ] || [ "$1" -gt 30 ] ; then
        echo "error: hive$1 does not exist."
    else
        ## YOUR CLASS LOGIN HERE:
        s1="ssh CLASS-LOGIN@hive"
        s4=".cs.berkeley.edu"
        s2=$s1"$1"
        s3=$s2$s4
        eval $s3
    fi
    
} 

export -f hive