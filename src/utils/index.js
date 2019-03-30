const withWeightedValue = (items, totalAmount) => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  return items.map(item => ({
    ...item,
    amount: totalAmount * (item.weight / totalWeight)
  }));
};

const withWeightedFactors = (workloads, factors) =>
  workloads.map(workload => {
    const workloadFactors = workload.factors.map(workloadFactor => {
      const factor = factors.find(factor => factor.id === workloadFactor.id);
      return {
        ...workload,
        amount: workloadFactor.amount / factor.total,
        weight: factor.weight
      };
    });
    const totalWorkloadFactor = workloadFactors.reduce(
      (sum, item) => sum + item.amount * (item.weight / 10) * 10,
      0
    );
    const totalWorkloadWeights = workloadFactors.reduce(
      (sum, amount) => sum + amount.weight,
      0
    );
    return {
      ...workload,
      weight: totalWorkloadFactor / totalWorkloadWeights
    };
  });

const withTime = (workloads, factors, totalTime) => {
  const workloadsWithFactors = withWeightedFactors(workloads, factors);
  return withWeightedValue(workloadsWithFactors, totalTime);
};

const asGenericWorkload = (tasks, factorMap) =>
  tasks.map(task => ({
    ...task,
    factors: factorMap.map(factor => ({
      id: factor.to,
      amount: task[factor.from]
    }))
  }));

export { withWeightedValue, withWeightedFactors, withTime, asGenericWorkload };
