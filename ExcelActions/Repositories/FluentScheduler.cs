using FluentScheduler;

namespace ExcelActions.Jobs;
public class ScheduledJobs : IJob{
    public void Execute()
    {
        Console.WriteLine("Job run time : {0}",DateTime.Now);
        Print();
    }
    public void Print(){
        Console.WriteLine("Printing ...");
    }
}
public class JobRegistry : Registry{
    public JobRegistry()
    {
         Schedule<ScheduledJobs>().ToRunEvery(5).Seconds();
        //  Schedule<MyJob>().ToRunOnceAt(DateTime.Now.AddMinutes(5)); // Runs once 5 minutes from now
        //  Schedule<MyJob>().ToRunOnceIn(5).Minutes(); // Runs once 5 minutes from now
        //  Schedule<MyJob>().ToRunEvery(5).Minutes(); // Runs every 5 minutes
        //  Schedule<MyJob>().ToRunEvery(1).Days(); // Runs every day
        // Schedule<MyJob>().ToRunEvery(1).Days().At(14, 30); // Runs every day at 2:30 PM

    }
}