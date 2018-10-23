import nodegit from "nodegit";

import { gitCons, projCons } from "app/git-abs/constants";

const { MAX_LOG_SIZE } = gitCons;
const { editFile } = projCons;

/**
 * Returns a list of commits (checkpoints) for the corresponding file
 * @param {nodegit.Repository} repo
 *
 * @return {Promise} then([{ message: '', date: new Date() }, ...]) catch(error)
 */

/***
 Usage Example:

 log(repository)
 .then(commits => console.log(commits))
 .catch(err => console.error(err))

 ***/

const log = repo => {
  let historyCommits = [],
    walker = null;

  const compileHistory = commits => {
    let lastSha = null;
    if (historyCommits.length > 0) {
      lastSha = historyCommits[historyCommits.length - 1].commit.sha();
      if (commits.length === 1 && commits[0].commit.sha() === lastSha) {
        return;
      }
    }

    commits.forEach(entry => {
      historyCommits.push(entry);
    });

    lastSha = historyCommits[historyCommits.length - 1].commit.sha();

    walker = repo.createRevWalk();
    walker.push(lastSha);
    walker.sorting(nodegit.Revwalk.SORT.TIME);

    return walker.fileHistoryWalk(editFile, MAX_LOG_SIZE).then(compileHistory);
  };

  return new Promise((resolve, reject) => {
    repo
      .getHeadCommit()
      .then(firstCommitOnBranch => {
        // History returns an event.
        walker = repo.createRevWalk();
        walker.push(firstCommitOnBranch.sha());
        walker.sorting(nodegit.Revwalk.SORT.Time);

        return walker.fileHistoryWalk(editFile, MAX_LOG_SIZE);
      })
      .then(compileHistory)
      .then(() =>
        historyCommits.map(({ commit }) => ({
          message: commit.message(),
          date: commit.date()
        }))
      )
      .then(commits => resolve(commits))
      .catch(err => reject(err));
  });
};

export default log;
