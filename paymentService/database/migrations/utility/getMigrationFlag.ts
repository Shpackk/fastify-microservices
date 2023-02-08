const getMigrationFlag = (processArgs: string[]) => {
  const flag = processArgs[2].split('=')[1];
  if (flag === 'up' || flag === 'down') return flag;
  console.info('Invalid migration flag.');
  process.exit(1);
};

export { getMigrationFlag };
