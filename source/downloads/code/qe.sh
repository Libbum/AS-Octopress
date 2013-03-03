#!/bin/sh
######################################################################
# Shell script to output usefull information regarding queue status. # 
# You can input projects at the command line, or change the defaults # 
# the second line below.                                             # 
######################################################################

#Check for command line arguments, set defaults if null
projects="$@"
[ -z "$projects" ] && projects=("h72" "k76")

#Get user details
user=$(whoami)
echo

#Print information for each project
for a in ${projects[@]}
do 
  #Dump queue and quota information to file 
  #(avoids miscalculation if queue changes during script run)
  nqstat -P $a > queue
  quotasu -P $a > quota

  #Build variables
  running=$(grep -Pc [0-9]+.R.$user queue)
  suspended=$(grep -Pc [0-9]+S.$user queue)
  queued=$(grep -Pc [0-9]+.Q.$user queue)
  orunning=$(grep -Pc '[0-9]+.R.(?!'$user')' queue)
  osuspended=$(grep -Pc '[0-9]+.S.(?!'$user')' queue)
  oqueued=$(grep -Pc '[0-9]+.Q.(?!'$user')' queue)
  hrsrun=$(grep -P [0-9]+.[RS].* queue | awk '{print $7":"$12}' | awk -F ":" '{ print ($1+$2/60+$3/3600)*$4 }' | paste -sd+ | bc)
  wallrun=$(grep -P [0-9]+.[RS].* queue | awk '{print $8":"$12}' | awk -F ":" '{ print ($1+$2/60+$3/3600)*$4 }' | paste -sd+ | bc)
  wallque=$(grep -P [0-9]+.Q.* queue | awk '{print $6":"$8}' | awk -F ":" '{ print ($1+$2/60+$3/3600)*$4 }' | paste -sd+ | bc)
  suremain=$(grep 'remaining\*\*' quota | awk '{print $4}')
  
  #Fix null data
  [ -z "$hrsrun" ] && hrsrun=0
  [ -z "$wallrun" ] && wallrun=0
  [ -z "$wallque" ] && wallque=0
  [ -z "$suremain" ] && suremain=0
  
  #Final totals
  suirun=$(echo "$suremain - $hrsrun" | bc)
  suique=$(echo "$suremain - $wallrun - $wallque" | bc)

  #Results Beautification
  [ "$(echo "($suique+0.5)/1" | bc)" -lt 0 ] && suique="\033[0;31m"$suique"\033[0m" || suique="\033[1;32m "$suique"\033[0m"

  #Output Information
  echo -e "\033[1;34mProject $a\033[0m"
  echo -e "Personal statistics\t  : $running running, $suspended suspended, $queued queued. $(($running+$suspended+$queued)) jobs in total."
  echo -e "Other user statistics\t  : $orunning running, $osuspended suspended, $oqueued queued. $(($orunning+$osuspended+$oqueued)) jobs in total."
  echo -e "Total jobs queued for $a : $(($queued+$oqueued))"
  sed -n '3,4p' quota
  echo -e 'SUs remaining (inc. running jobs)\t '$suirun
  echo -e 'SUs remaining (inc. queued requests)\t'$suique'\n'
done

#Clean temp files
rm {queue,quota}
