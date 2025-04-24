using Microsoft.EntityFrameworkCore;

namespace MedienVerwaltungDBDLL
{
    public class RetryStrategy : SqlServerRetryingExecutionStrategy
    {
        private readonly List<TimeSpan> _retryDelays;
        private int _currentRetryCount = 0;

        public RetryStrategy(MedienVerwaltungContext context)
            : base(context, 3, TimeSpan.FromSeconds(30), null)
        {
            _retryDelays =
            [
                TimeSpan.FromSeconds(5),
                TimeSpan.FromSeconds(15),
                TimeSpan.FromSeconds(30)
            ];
        }

        protected override TimeSpan? GetNextDelay(Exception lastException)
        {

            if (_currentRetryCount < _retryDelays.Count)
            {
                return _retryDelays[_currentRetryCount];
            }

            return null;
        }

        protected void OnRetry(Exception e, TimeSpan delay, int retryCount, MedienVerwaltungContext context)
        {
            _currentRetryCount++;
        }
    }
}