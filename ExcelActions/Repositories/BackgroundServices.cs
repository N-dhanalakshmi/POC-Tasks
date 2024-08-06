namespace ExcelActions.ScheduledService
{
    public class ScheduledService : BackgroundService
    {
        private readonly CancellationTokenService cancellationTokenService;
        private readonly TimeSpan _interval = TimeSpan.FromSeconds(5);

        public ScheduledService(CancellationTokenService cancellationTokenService)
        {
            this.cancellationTokenService = cancellationTokenService ?? throw new ArgumentNullException(nameof(cancellationTokenService));
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
        // cancellation token here is to cancel the execution of this background service when the
        // application shuts down , 
        // stopping token is a default token used by Background service 
        // If we want to make custom cancellation or reset of token we can use 
        // cancellationtokenservice to create new token , cancel or reset token
        // we need to create token with both default stoppingtoken and custom token

        //  while (!stoppingToken.IsCancellationRequested)
        // {
        //     ExecutingJob();
        //     await Task.Delay(_interval, stoppingToken);
        // }
                // Create a combined token that includes both the stoppingToken and the custom token
                var customToken = cancellationTokenService.CancellationTokenSource.Token;
                var combinedToken = CancellationTokenSource.CreateLinkedTokenSource(stoppingToken, customToken).Token;

                while (!combinedToken.IsCancellationRequested)
                {
                    ExecutingJob();
                    try
                    {
                        // Console.WriteLine(customToken.IsCancellationRequested);
                        await Task.Delay(_interval, combinedToken);
                    }
                    catch (OperationCanceledException)
                    {
                        // Handle the task cancellation
                        Console.WriteLine("Task was canceled.");
                        // Console.WriteLine(customToken.IsCancellationRequested);
                    }
                }

                // Wait a short period before rechecking the token status
                // await Task.Delay(TimeSpan.FromSeconds(1), stoppingToken);
            }
        }

        private void ExecutingJob()
        {
            Console.WriteLine($"Job run time: {DateTime.Now}");
        }
    }

    public class CancellationTokenService
    {
        public CancellationTokenSource CancellationTokenSource { get; private set; } = new CancellationTokenSource();

        public void Cancel()
        {
            Console.WriteLine("Cancel token executed");
            CancellationTokenSource.Cancel();
        }

        public void Reset()
        {
            Console.WriteLine("Reset token executed");
            if (CancellationTokenSource.IsCancellationRequested)
            {
                CancellationTokenSource.Dispose();
                CancellationTokenSource = new CancellationTokenSource();
            }
        }
    }
}
