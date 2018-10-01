import nodegit from "nodegit";

import { gitCons } from "app/git-abs/constants";

const { GIT_CONFIG_PATH, MAX_LOG_SIZE } = gitCons;

/**
 * Returns a list of commits (checkpoints) for the corresponding file
 * @param {String} file
 *
 * @return {Promise} then([{ message: '', date: new Date() }, ...]) catch(error)
 */

/***
 Usage Example:

 log('test.js')
 .then(commits => console.log(commits))
 .catch(err => console.error(err))

 ***/

const log = file => {
  let historyCommits = [],
    repo = null,
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

    return walker.fileHistoryWalk(file, MAX_LOG_SIZE).then(compileHistory);
  };

  return new Promise((resolve, reject) => {
    nodegit.Repository.open(GIT_CONFIG_PATH)
      .then(openRepo => {
        repo = openRepo;
        return repo.getMasterCommit();
      })
      .then(firstCommitOnMaster => {
        // History returns an event.
        walker = repo.createRevWalk();
        walker.push(firstCommitOnMaster.sha());
        walker.sorting(nodegit.Revwalk.SORT.Time);

        return walker.fileHistoryWalk(file, MAX_LOG_SIZE);
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
