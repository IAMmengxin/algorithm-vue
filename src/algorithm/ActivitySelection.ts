type Activity = {
    activityName:string,
    St:number,
    Et:number,
}
//目标是选择一组互不冲突的活动，使得能够安排尽可能多的活动。这个问题通常假设每个活动都有一个开始时间和一个结束时间，并且活动在结束时间之后可以立即开始。
// 活动选择遵循原则：a2St<=a1Et,a1St<=a2Et
class ActivitySelection {
    private activityList:Activity[]=[
        {activityName:"a1",St:1,Et:4},
        {activityName:"a2",St:3,Et:5},
        {activityName:"a3",St:0,Et:6},
        {activityName:"a4",St:5,Et:7},
        {activityName:"a5",St:3,Et:8},
        {activityName:"a6",St:5,Et:9},
        {activityName:"a7",St:8,Et:10}
    ];
    activitySelection(activities: Activity[]=this.activityList) {
        const result:Activity[]=[];
        //依据a2St>=a1Et的原则，可以按照活动的结束时间进行排序
        let activitiesE = activities.sort((a,b)=>{
            return a.Et-b.Et;
        });
        result.push(activitiesE[0])
        let currentActivity:number = 0;
        let nextActivity = currentActivity;
        const lastIndexE = activitiesE.length-1;
        while(nextActivity<=lastIndexE){
            const nextActive = activitiesE[nextActivity]
            const currentActive = activitiesE[currentActivity]
            if(nextActive.St>=currentActive.Et){
                currentActivity = nextActivity;
                result.push(activitiesE[currentActivity]);
            }else
                nextActivity++;
        }
        console.log("活动列表：",result)
        return result;
    }
}
const activitySelection = new ActivitySelection();
export default activitySelection;