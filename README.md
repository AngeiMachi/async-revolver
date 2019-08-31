# async-revolver
A lightweight , dependency free and promise based library to manage the use of resources asynchronously by minimum interval time throttling.

can work well with a group of api keys limited calls a minute for example where the keys are taken as bullets.

## Installation:

npm install async-revolver

## Usage :
    bullets - array or object of assets to be retrieved 
    intervalTime - the interval between each bullet or between a full round 
    includeFirstRound - skip throttling the first round or not
    fullRoundInterval - throttling between full round or each bullet
## Usage :
    ### Case 1 ( includeFirstRound = false , groupInterval = true)
    
        let revolver = new AsyncRevolver([1,2,3],1000, false , true)

        let v1 = await revolver.next(); (0 seconds) //..1
        let v2 = await revolver.next(); (0 seconds) //..2
        let v3 = await revolver.next(); (0 seconds) //..3
        let v4 = await revolver.next(); (1 seconds) //..1
        let v5 = await revolver.next(); (1 seconds) //..2
        let v6 = await revolver.next(); (1 seconds) //..3
        let v7 = await revolver.next(); (2 seconds) //..1
        let v8 = await revolver.next(); (2 seconds) //..2
        let v9 = await revolver.next(); (2 seconds) //..3

    ### Case 2 ( includeFirstRound = true , groupInterval = true)
    
        let revolver = new AsyncRevolver([1,2,3],1000, false , true)

        let v1 = await revolver.next(); (1 seconds) //..1
        let v2 = await revolver.next(); (1 seconds) //..2
        let v3 = await revolver.next(); (1 seconds) //..3
        let v4 = await revolver.next(); (2 seconds) //..1
        let v5 = await revolver.next(); (2 seconds) //..2
        let v6 = await revolver.next(); (2 seconds) //..3
        let v7 = await revolver.next(); (3 seconds) //..1
        let v8 = await revolver.next(); (3 seconds) //..2
        let v9 = await revolver.next(); (3 seconds) //..3
    
     ### Case 3 ( includeFirstRound = false , groupInterval = false)
    
        let revolver = new AsyncRevolver([1,2,3],1000, false , true)

        let v1 = await revolver.next(); (0 seconds) //..1
        let v2 = await revolver.next(); (1 seconds) //..2
        let v3 = await revolver.next(); (2 seconds) //..3
        let v4 = await revolver.next(); (3 seconds) //..1
        let v5 = await revolver.next(); (4 seconds) //..2
        let v6 = await revolver.next(); (5 seconds) //..3
        let v7 = await revolver.next(); (6 seconds) //..1
        let v8 = await revolver.next(); (7 seconds) //..2
        let v9 = await revolver.next(); (8 seconds) //..3

    ### Case 4 ( includeFirstRound = true , groupInterval = false)
    
        let revolver = new AsyncRevolver([1,2,3],1000, false , true)

        let v1 = await revolver.next(); (1 seconds) //..1
        let v2 = await revolver.next(); (2 seconds) //..2
        let v3 = await revolver.next(); (3 seconds) //..3
        let v4 = await revolver.next(); (4 seconds) //..1
        let v5 = await revolver.next(); (5 seconds) //..2
        let v6 = await revolver.next(); (6 seconds) //..3
        let v7 = await revolver.next(); (7 seconds) //..1
        let v8 = await revolver.next(); (8 seconds) //..2
        let v9 = await revolver.next(); (9 seconds) //..3





