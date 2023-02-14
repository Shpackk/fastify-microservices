const logSucces = (migration: string) => {
  console.group();
  console.info(`
   \x1b[0;36m COMPLETED \x1b[0m \n
   ${migration} \n
   \x1b[0;36m SUCCESSFULLY \x1b[0m
  `);
  console.groupEnd();
};

const logError = (migration: string, error: any) => {
  console.group();
  console.info(`
   \x1b[0;31m MIGRATION \x1b[0m \n
   ${migration} \n
   \x1b[0;31m IS NOT APPLIED. ERROR \x1b[0m
  `);
  console.error(error);
  console.groupEnd();
};

export { logError, logSucces };
